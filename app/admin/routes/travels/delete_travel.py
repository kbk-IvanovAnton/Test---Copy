# type: ignore

from flask import jsonify, request

from app import db
from app.admin import bp
from app.admin.models.travel import Travel


@bp.route("/admin_menu/delete_travel", methods=["POST"])
def delete_travel():
    data = request.json
    travel = Travel.query.get(data["id"])
    if travel:
        db.session.delete(travel)
        db.session.commit()
        return jsonify(success=True)
    return jsonify(success=False)
