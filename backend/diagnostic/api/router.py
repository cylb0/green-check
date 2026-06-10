from ninja import Router
from diagnostic.api.endpoints.plans import router as plans_router
from diagnostic.api.endpoints.auth import router as auth_router
from diagnostic.api.endpoints.subscriptions import router as subscriptions_router

router = Router()
router.add_router('', auth_router)
router.add_router('plans', plans_router)
router.add_router('subscriptions', subscriptions_router)