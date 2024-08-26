from flask import Blueprint

bp = Blueprint(
    "admin",
    __name__,
    template_folder="templates",
    static_folder="static",
    static_url_path="/admin/static",
)

from app.admin.routes.account_items import (
    account_items_table,
    add_item,
    delete_item,
    edit_item,
    update_account_items_order,
)
from app.admin.routes.allowance_prices_world import allowance_prices_table
from app.admin.routes.currencies import (
    add_currency,
    currency_table,
    delete_currency,
    edit_currency,
    update_currency_order,
)
from app.admin.routes.payment_methods import (
    add_method,
    delete_method,
    edit_method,
    payment_methods_table,
    update_payment_methods_order,
)
from app.admin.routes.receipts import (
    add_receipt,
    delete_receipt,
    edit_receipt,
    receipts_table,
    update_receipts_order,
)
from app.admin.routes.supported_types import (
    add_type,
    delete_type,
    edit_type,
    supported_types_table,
    update_supported_types_order,
)
from app.admin.routes.travels import (
    add_travel,
    delete_travel,
    edit_travel,
    travel_table,
    update_single_order,
)
from app.admin.routes.users import admin_table, delete_user, edit_user
