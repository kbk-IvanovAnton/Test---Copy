# type: ignore


from flask import jsonify, request

from app import db
from app.admin import bp
from app.admin.models.currencies import Currencies


@bp.route("/admin_menu/edit_currency", methods=["POST"])
def edit_currency():
    data = request.json
    currency = Currencies.query.get(data["id"])
    if currency:
        currency.name = data["currencyName"]
        currency.prefix = data["currencyPrefix"]
        currency.suffix = data["currencySuffix"]
        currency.code = data["currencyCode"]
        currency.decimal = data["currencyDigit"]
        currency.is_show_japan = bool(data["currencyButtonJapan"])
        currency.is_show_world = bool(data["currencyButtonWorld"])
        db.session.commit()
        return jsonify(success=True)
    return jsonify(success=False)
