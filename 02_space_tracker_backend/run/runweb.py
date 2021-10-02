# -*- coding: UTF-8 -*-
#--------------------------------------------------------------------------
# NASA/GSFC, Software Integration & Visualization Office, Code 610.3
#--------------------------------------------------------------------------
#
# MODULE: runweb || CherryPy Server
# FILE: runweb.py
# USE: python3 start.py (at root directory)
#
#> @author(s)
#> Albert Cervera
#
#  DESCRIPTION:
#> The quick brown Fox jumps over the lazy dog.
#
# REVISION HISTORY:
#
# 01 October 2021 - Initial Version
# 02 October 2021 - Final Version
#
# MODIFICATIONS:
#
# Initial mod. version: --------
# Final mod. version:   --------
#
# TODO_dd_mmm_yyyy - TODO_describe_appropriate_changes - TODO_name
#--------------------------------------------------------------------------
import cherrypy
import os, os.path
from settings import settings

class AppUnoServer(object):


    def __init__(self):        
        return None

    def CORS():
        if cherrypy.request.method == 'OPTIONS':
            cherrypy.response.headers['Access-Control-Allow-Methods'] = 'POST'
            cherrypy.response.headers['Access-Control-Allow-Headers'] = 'content-type'
            cherrypy.response.headers['Access-Control-Allow-Origin']  = '*'
            return True
        else:
            cherrypy.response.headers['Access-Control-Allow-Origin'] = '*'
    cherrypy.tools.CORS = cherrypy._cptools.HandlerTool(CORS)


    #Methods 

    @cherrypy.expose
    def test(self):
        msg = "The quick brown fox jumps over the lazy dog."
        print("\nCherryPy is working! ----------------------------------------")
        return msg


  
class AppUno(object):

        def __init__(self):
            return None

        def start(self, port = 8080):
            conf = {
                '/static': {
                    'tools.staticdir.on': True,
                    'tools.staticdir.dir': './public'
                },
                '/': {
                    'tools.sessions.on': True,
                    'tools.staticdir.root': os.path.abspath(os.getcwd())
                },
                
            }
            cherrypy.server.socket_host = '0.0.0.0'
            cherrypy.server.socket_port= port
            cherrypy.quickstart(AppUnoServer(), '/', conf)

