# type: ignore

from flask import Flask
from flask_login import LoginManager
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
migrate = Migrate()
login = LoginManager()
login.login_view = "auth.login"


def create_app(config_class="config.Config"):
    app = Flask(__name__)
    app.config.from_object(config_class)

    db.init_app(app)
    migrate.init_app(app, db)
    login.init_app(app)

    from app.main import bp as main_bp

    app.register_blueprint(main_bp)

    from app.auth import bp as auth_bp

    app.register_blueprint(auth_bp)

    from app.admin import bp as admin_bp

    app.register_blueprint(admin_bp)

    return app


from app.admin.models import (
    account_items,
    allowance_prices_japan,
    allowance_prices_world,
    currencies,
    payment_metods,
    receipts,
    supported_types,
    travel,
)
from app.auth.models import user
from app.main.models import (
    allowance_drives,
    allowance_lodgments,
    allowance_moves,
    allowance_regions,
    allowance_special_cases,
    allowance_specials,
    allowance_works,
    allowances,
    details,
    locations1,
    locations2,
    order,
    rates,
    regions2,
    task,
)
