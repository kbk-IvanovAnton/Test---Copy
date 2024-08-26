from flask import jsonify, redirect, request, url_for

from app import db
from app.admin import bp
from app.admin.models.allowance_prices_world import AllowancePricesWorld


@bp.route("/admin_menu/add_price_world", methods=["POST"])
def add_price_world():
    data = request.json
    new_price = AllowancePricesWorld(
        name=data["currencyName"],
        prefix=data["currencyPrefix"],
        suffix=data["currencySuffix"],
        code=data["currencyCode"],
        decimal=data["currencyDigit"],
    )
    if new_price:
        db.session.add(new_price)
        db.session.commit()
        return jsonify(success=True, id=new_price.id)
    return redirect(url_for("admin/currency_table"))
