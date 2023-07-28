import os
from flask import *
#from app import db
from app import verbs


def create_app(test_config=None):
    """
    Create and configure the app.
    """
    app = Flask(__name__, instance_relative_config=True)

    app.config.from_mapping(
        SECRET_KEY='dev',
        #DATABASE=os.path.join(app.instance_path, 'db.sqlite'),
    )

    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    lang = 'fr'
    
    @app.route("/")
    def index():
        return redirect('/{}/home'.format(lang))
    
    @app.route("/<lang>/home")
    def home(lang):
        return render_template('/{}/home.html'.format(lang))
    
    @app.route("/<lang>/translation")
    def translation(lang):
        return render_template('/{}/translation.html'.format(lang))
    
    @app.route("/<lang>/exercise", methods=['GET', 'POST'])
    def exercise(lang):
        if request.method == 'POST':
            startlang = request.headers.get('startlang')
            endlang = request.headers.get('endlang')
            tense = int(request.headers.get('tense'))
            verbs_list = verbs.get_exercise(startlang, endlang, tense)
            # Redirects to the exercises page with the verbs list loaded.
            return render_template('/{}/exercise.html'.format(lang), verbs_list=verbs_list)
        else:
            return render_template('/{}/exercise.html'.format(lang), verbs_list=[])
    
    @app.route("/<lang>/terms")
    def terms(lang):
        return render_template('/{}/terms.html'.format(lang))
    
    @app.route("/<lang>/privacy")
    def privacy(lang):
        return render_template('/{}/privacy.html'.format(lang))
   
    #db.init_app(app)

    #with app.app_context():
        #db.init_db()

    return app
