# type: ignore

from flask import jsonify, request

from app import db
from app.admin import bp
from app.auth.models.user import User
from app.main.models.order import Order


@bp.route("/admin_menu/delete_user", methods=["POST"])
def delete_user():
    data = request.get_json()
    user_id = data.get("id")
    user = User.query.get(user_id)
    if user:
        db.session.query(Order).filter(Order.name_id == user_id).delete()
        db.session.delete(user)
        db.session.commit()
        return jsonify(success=True)
    return jsonify(success=False)
