# type: ignore


from flask import jsonify, request

from app import db
from app.admin import bp
from app.auth.models.user import User


@bp.route("/admin_menu/edit_user", methods=["POST"])
def edit_user():
    data = request.json
    user = User.query.get(data["id"])
    if user:
        user.name = data["name"]
        user.email = data["email"]
        user.is_show = bool(data["is_show"])
        db.session.commit()
        return jsonify(success=True)
    return jsonify(success=False)
