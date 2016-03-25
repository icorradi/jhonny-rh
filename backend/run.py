# -*- coding: utf-8 -*-

import cherrypy
import app

default_conf = {
    'request.dispatch': cherrypy.dispatch.MethodDispatcher(),
    'tools.CORS.on': True,
    'tools.response_headers.on': True,
    'tools.response_headers.headers': [('Content-Type', 'application/json')],
}

def CORS():
    cherrypy.response.headers["Access-Control-Allow-Origin"] = "*"

if __name__ == '__main__':
    conf = {
        '/employees': default_conf,
        '/payroll': default_conf,
    }
    cherrypy.tools.CORS = cherrypy.Tool('before_handler', CORS)

    myApp = app.Index()
    myApp.employees = app.Employees()
    myApp.payroll = app.Payroll()

    cherrypy.quickstart(myApp, '/api', conf)
