from ninja import NinjaAPI
from diagnostic.api.router import router as diag

api = NinjaAPI()
api.add_router('', diag)