# type: ignore
from flask import jsonify, redirect, request, url_for
from sqlalchemy import func

from app import db
from app.admin import bp
from app.admin.models.payment_metods import PaymentMethods


@bp.route("/admin_menu/add_payment_method", methods=["POST"])
def add_payment_method():
    data = request.json
    new_method = PaymentMethods(paymentMethodName=data["paymentMethodName"])
    if new_method:
        db.session.add(new_method)
        max_order = db.session.query(func.max(PaymentMethods.order)).scalar() or 0
        new_method.order = max_order + 1
        db.session.commit()
        return jsonify(success=True, id=new_method.id)
    return redirect(url_for("admin/payment_methods_table"))
