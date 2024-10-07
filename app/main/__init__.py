from flask import Blueprint

bp = Blueprint(
    "main",
    __name__,
    template_folder="templates",
    static_folder="static",
    static_url_path="/main/static",
)

from app.main.routes import (  # get_rate_data,
    allowances,
    allowances_print,
    copy_order,
    create_order,
    create_task,
    delete_order,
    get_alllowance_prices_japan,
    hide_order,
    index,
    print_japan,
    return_trip_unit_price,
    trip_unit_price,
    update_order,
)
