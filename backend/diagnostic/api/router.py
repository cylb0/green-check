from ninja import Router
from diagnostic.api.endpoints.plans import router as plans_router
from diagnostic.api.endpoints.auth import router as auth_router

router = Router()
router.add_router('', auth_router)