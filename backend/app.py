# -*- coding: utf-8 -*-
import cherrypy
from pymongo import MongoClient
from bson.json_util import dumps
from bson.objectid import ObjectId


#database
client = MongoClient()
db = client.rh

class Index(object):

    @cherrypy.expose
    def index(self):
        return 'it\'s running!'


class Employees(object):
    exposed = True

    def GET(self):
        return dumps(db.employees.find())

    def POST(self, *args, **kwargs):
        #fake data
        result = db.employees.insert_one(
            {
                'address': {
                    'street': kwargs['street'],
                    'zipcode': kwargs['zipcode'],
                    'district': kwargs['district'],
                    'city': kwargs['city'],
                },
                'name': kwargs['name'],
                'cpf': kwargs['cpf'],
                'RG': kwargs['RG'],
                'birth': kwargs['birth'],
                'phone': kwargs['phone'],
                'position': kwargs['position'],
                'salary': kwargs['salary'],
                'admission': kwargs['admission'],
                'company': kwargs['company'],
            }
        )

        # Create blank payroll for this new employer
        db.payroll.insert_one(
            {
                'employer_id': result.inserted_id,
                'name': kwargs['name'] if 'name' in kwargs else ''
            }
        )

        # Create blank transportation allowance for this new employer
        db.allowance.insert_one(
            {
                'employer_id': result.inserted_id,
                'name': kwargs['name'] if 'name' in kwargs else ''
            }
        )


        return dumps(result.inserted_id)


class Payroll(object):
    exposed = True

    def GET(self, id=None):
        if id:
            result = db.payroll.find({'employer_id': ObjectId(id)})
        else:
            result = db.payroll.find()


        return dumps(result)
