# type: ignore


from flask import jsonify, request

from app import db
from app.admin import bp
from app.admin.models.travel import Travel


@bp.route("/admin_menu/edit_travel", methods=["POST"])
def edit_travel():
    data = request.json
    travel = Travel.query.get(data["id"])
    if travel:
        travel.travelName = data["name"]
        travel.is_show = bool(data["is_show_travel"])
        db.session.commit()
        return jsonify(success=True)
    return jsonify(success=False)
