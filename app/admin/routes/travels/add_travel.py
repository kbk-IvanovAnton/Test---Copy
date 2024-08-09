# type: ignore
from flask import jsonify, redirect, request, url_for
from sqlalchemy import func

from app import db
from app.admin import bp
from app.admin.models.travel import Travel


@bp.route("/admin_menu/add_travel", methods=["POST"])
def add_travel():
    data = request.json
    new_travel = Travel(travelName=data["travelName"])
    if new_travel:
        db.session.add(new_travel)
        max_order = db.session.query(func.max(Travel.order)).scalar() or 0
        new_travel.order = max_order + 1
        db.session.commit()
        return jsonify(success=True, id=new_travel.id)
    return redirect(url_for("admin/travel_table"))
