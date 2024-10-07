from flask import jsonify, render_template, request, session

from app.admin.models.account_items import AccountItems
from app.admin.models.payment_metods import PaymentMethods
from app.admin.models.receipts import Receipts
from app.admin.models.supported_types import SupportedTypes
from app.admin.models.travel import Travel
from app.auth.models.user import User
from app.main import bp
from app.main.models.allowance_lodgments import AllowanceLodgments
from app.main.models.allowance_moves import AllowanceMoves
from app.main.models.allowance_special_cases import AllowanceSpecialCases
from app.main.models.allowance_specials import AllowanceSpecials
from app.main.models.allowance_works import AllowanceWorks
from app.main.models.allowances import Allowances
from app.main.models.details import Details
from app.main.models.locations1 import Locations1
from app.main.models.order import Order
from app.main.models.rates import Rates


@bp.route("/print_japan/<int:order_id>", methods=["GET"])
def print_japan(order_id):
    order = Order.query.filter_by(id=order_id).first_or_404()
    details = Details.query.filter_by(order_id=order_id).all()
    user = User.query.filter_by(id=order.name_id).first_or_404()
    rate = Rates.query.filter_by(order_id=order_id).first_or_404()

    allowances = Allowances.query.filter_by(order_id=order_id).first_or_404()
    allowances_moves = AllowanceMoves.query.filter_by(id=order_id).first_or_404()
    allowance_lodgments = AllowanceLodgments.query.filter_by(id=order_id).first_or_404()
    allowance_works = AllowanceWorks.query.filter_by(id=order_id).first_or_404()
    allowance_specials = AllowanceSpecials.query.filter_by(id=order_id).first_or_404()
    allowance_special_cases = AllowanceSpecialCases.query.filter_by(id=order_id).first_or_404()

    account_items = AccountItems.query.all()
    payment_methods = PaymentMethods.query.all()
    receipts = Receipts.query.all()
    travel = Travel.query.all()
    types = SupportedTypes.query.all()
    locs = Locations1.query.all()

    return render_template(
        "main/print_japan.html",
        order=order,
        details=details,
        user=user,
        rate=rate,
        allowances=allowances,
        account_items=account_items,
        payment_methods=payment_methods,
        receipts=receipts,
        travel=travel,
        types=types,
        allowances_moves=allowances_moves,
        allowance_lodgments=allowance_lodgments,
        allowance_works=allowance_works,
        allowance_specials=allowance_specials,
        allowance_special_cases=allowance_special_cases,
        locs=locs,
    )
