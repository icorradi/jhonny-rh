# -*- coding: utf-8 -*-

import cherrypy
import app


if __name__ == '__main__':
    conf = {
        '/employees': {
            'request.dispatch': cherrypy.dispatch.MethodDispatcher(),
            'tools.response_headers.on': True,
        },
    }
    myApp = app.Index()
    myApp.employees = app.Employees()

    cherrypy.quickstart(myApp, '/', conf)
