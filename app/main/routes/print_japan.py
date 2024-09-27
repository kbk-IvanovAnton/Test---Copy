from flask import render_template

from app.main import bp


@bp.route("/print-japan")
def print_japan():
    return render_template("main/print_japan.html")
