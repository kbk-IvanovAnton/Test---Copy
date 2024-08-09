# type: ignore

from flask import jsonify, request

from app import db
from app.admin import bp
from app.admin.models.payment_metods import PaymentMethods


@bp.route("/admin_menu/delete_payment_method", methods=["POST"])
def delete_payment_method():
    data = request.json
    method = PaymentMethods.query.get(data["id"])
    if method:
        db.session.delete(method)
        db.session.commit()
        return jsonify(success=True)
    return jsonify(success=False)
