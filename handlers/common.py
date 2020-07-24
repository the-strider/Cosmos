import os
from datetime import datetime, timedelta
from dateutil import tz

import aiohttp
from tornado.web import HTTPError, escape
from tornado.ioloop import IOLoop

from .base import BaseHandler


class Signup(BaseHandler):
    async def get(self):
        return self.render("signup.html")


class HomePage(BaseHandler):
    async def get(self):
        return self.render("homepage.html")