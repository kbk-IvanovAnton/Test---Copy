# type: ignore


from flask import jsonify, redirect, request, url_for
from sqlalchemy import func

from app import db
from app.admin import bp
from app.admin.models.currencies import Currencies


@bp.route("/admin_menu/add_currency", methods=["POST"])
def add_currency():
    data = request.json
    new_currency = Currencies(
        name=data["currencyName"],
        prefix=data["currencyPrefix"],
        suffix=data["currencySuffix"],
        code=data["currencyCode"],
        decimal=data["currencyDigit"],
    )
    if new_currency:
        db.session.add(new_currency)
        max_order = db.session.query(func.max(Currencies.order)).scalar() or 0
        new_currency.order = max_order + 1
        db.session.commit()
        return jsonify(success=True, id=new_currency.id)
    return redirect(url_for("admin/currency_table"))
