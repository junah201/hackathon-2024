from sqlalchemy_schemadisplay import create_schema_graph
from sqlalchemy import MetaData
import pymysql

from app.common.config import DATABASE_URL

pymysql.install_as_MySQLdb()

graph = create_schema_graph(metadata=MetaData(DATABASE_URL))
graph.write_png('my_erd.png')
