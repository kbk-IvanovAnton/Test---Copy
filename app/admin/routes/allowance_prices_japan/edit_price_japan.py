from flask import jsonify, request

from app import db
from app.admin import bp
from app.admin.models.allowance_prices_japan import AllowancePricesJapan


@bp.route("/admin_menu/edit_price_japan", methods=["POST"])
def edit_price_japan():
    data = request.json
    price = AllowancePricesJapan.query.get(data["id"])
    if price:
        price.allowance = data["allowance"]
        price.note = data["note"]
        db.session.commit()
        return jsonify(success=True)
    return jsonify(success=False)
