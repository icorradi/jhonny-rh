# -*- coding: utf-8 -*-
import cherrypy
from pymongo import MongoClient
from datetime import datetime
from bson.json_util import dumps

#database
client = MongoClient()
db = client.rh
collection = db.employees

class Index(object):

    @cherrypy.expose
    def index(self):
        return 'it\'s running!'


class Employees(object):
    exposed = True

    def GET(self):
        return dumps(collection.find())

    def POST(self):
        #fake data
        result = collection.insert_one(
            {
                'address': {
                    'street': '2 Avenue',
                    'zipcode': '10075',
                    'building': '1480',
                },
                'name': 'Matheus Costa',
                'cpf': '123.756.234-32',
                'RG': '12.546.455',
                'birth_date': datetime.strptime('2014-10-01', '%Y-%m-%d'),
                'phone': '3198749345'
            }
        )

        return 'Created ' + dumps(result.inserted_id)
