from flask import render_template
from flask_login import login_required

from app.main import bp


@bp.route("/create_task", methods=["GET", "POST"])
@login_required
def create_task():
    return render_template("main/create_task.html", title="Create Task")
