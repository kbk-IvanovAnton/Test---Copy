import sqlalchemy as sa
from flask import jsonify

from app import db
from app.admin.models.allowance_prices_japan import AllowancePricesJapan
from app.main import bp


@bp.route("/admin_menu/get_allowance_prices_japan")
def get_allowance_prices_japan():
    allowance_prices = db.session.scalars(sa.select(AllowancePricesJapan)).all()
    if allowance_prices:
        result = [
            {
                "id": allowance_price.id,
                "name": allowance_price.name,
                "allowance": allowance_price.allowance,
            }
            for allowance_price in allowance_prices
        ]
        return jsonify(success=True, result=result)
    return jsonify(success=False)
