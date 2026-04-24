//code from Profesor Lisa Levison, modified for this experiment

PennController.ResetPrefix(null) // Shorten command names (keep this)
PennController.DebugOff()

SetCounter("counter", "inc", 1)

Sequence("counter", "completioncode", "setup", "instructions", "participantInformation", "withoutError", "withError",
    rshuffle(
        randomize("main.trial-error"),
        randomize("main.trial-noerror")
    ),
    "send", "end"
)

// Generate completion code
newTrial("completioncode",
    newVar("completion")
        .global()
        .set(Math.floor((Math.random() * 10000) + 1))
)
.log("completioncode", getVar("completion"))

// Welcome screen
newTrial("setup",
    defaultText
        .cssContainer({"margin-bottom":"1em", "margin-left":"5em", "margin-right":"5em"})
        .print()
    ,
    newText("<p>Bienvenue!")
    ,
    newText(`Nous vous remercions de votre participation. Ce sondage fait partie d’un projet universitaire de l’Université de Michigan aux États-Unis et vise des objectifs pédagogiques. Votre participation est volontaire et vous pouvez quitter le questionnaire à tout moment si vous ne souhaitez pas continuer. Pendant le sondage vous devez écouter les enregistrements des phrases. La durée totale du sondage est de 5 minutes ou moins.`)
    ,
    newText("Si vous avez des questions ou des préoccupations, veuillez contacter atanase@umich.edu.")
    ,
    newButton("Démarrer")
        .center()
        .print()
        .wait()
)

// Header: declare and log participant info vars on every trial
Header(
    newVar("v_whereFrom").global(),
    newVar("v_whatAge").global(),
    newVar("v_whatGender").global(),
    newVar("v_speakAnother").global(),
    newVar("v_whatLanguage").global()
)
.log("whereFrom",    getVar("v_whereFrom"))
.log("whatAge",      getVar("v_whatAge"))
.log("whatGender",   getVar("v_whatGender"))
.log("speakAnother", getVar("v_speakAnother"))
.log("whatLanguage", getVar("v_whatLanguage"))

// Instructions
newTrial("instructions",
    fullscreen(),
    defaultText
        .cssContainer({"margin-bottom":"1em", "margin-left":"5em", "margin-right":"5em"})
        .print()
    ,
    newText(`<p>
Veuillez vérifier que le son de votre ordinateur fonctionne correctement. Après le lancement du sondage, l'enregistrement d'une phrase sera diffusé. Un bip sonore indiquera la fin d'une phrase. Si vous entendez une erreur grammaticale dans la phrase, appuyez sur la barre espace dès que vous l'entendez. Si vous arrivez à la fin sans avoir repéré une erreur grammaticale, appuyez sur la touche entrée pour passer à l'enregistrement suivant. Les enregistrements sont assez courts (entre 5-10 secondes) et ne peuvent pas être réécoutés une fois diffusés, donc assurez-vous d'être prêt. Toutes les phrases ne contiennent pas nécessairement d'erreur, et on ne vous dira pas après chaque phrase si celle-ci contenait ou non une erreur. Les deux phrases suivantes serviront d'entraînement et une vérification que l'audio fonctionne, puis l'expérience commencera.</p>`)
    ,
    newButton("Cliquez quand vous êtes prêts à commencer")
        .css("font-family", "Helvetica, sans-serif")
        .css("font-size", "16px")
        .center()
        .print()
        .wait()
        .remove()
)

// Practice trial - no error
newTrial("withoutError",
    newAudio("d", "native_s1c.wav"),
    
    newKey("play-d", "")
        .settings.callback(
            getAudio("d")
                .play("once")
                .remove()
        ),
    newText(`<p>Cette phrase ne contient PAS une erreur.</p>
             <p>Appuyez sur n'importe quelle touche pour écouter l'enregistrement.</p>`)
            .css("font-family", "Helvetica, sans-serif")
            .css("font-size", "16px")
            .print("center at 50%", "middle at 50%")
    ,
    newButton("Cliquez pour avancer")
        .css("font-family", "Helvetica, sans-serif")
        .css("font-size", "16px")
        .center()
        .print("center at 50%", "bottom at 80%")
        .wait()
        .remove()
)

// Practice trial - with error
newTrial("withError",
    newAudio("t", "native_s1i.wav"),
    newKey("play-t", "")
        .settings.callback(
            getAudio("t")
                .play("once")
                .remove()
        ),
    newText(`<p>Cette phrase contient une erreur.</p>
             <p>Appuyez sur n'importe quelle touche pour écouter l'enregistrement.</p>`)
            .css("font-family", "Helvetica, sans-serif")
            .css("font-size", "16px")
            .print("center at 50%", "middle at 50%")
    ,
    newButton("Cliquez pour avancer")
        .css("font-family", "Helvetica, sans-serif")
        .css("font-size", "16px")
        .center()
        .print("center at 50%", "bottom at 80%")
        .wait()
        .remove()
)

// Participant information (collected AFTER trials)
newTrial("participantInformation",
    defaultText
        .cssContainer({"margin-bottom":"1em", "margin-left":"5em", "margin-right":"5em"})
        .print()
    ,
    defaultTextInput
        .css("margin","1em")
        .css("margin-left", "6em")
        .print()
    ,
    defaultDropDown
        .css("margin","1em")
        .css("margin-left", "6em")
        .print()
    ,
    newText("Ce sondage s'adresse aux locuteurs natifs du français. D'abord, veuillez répondre aux questions démographiques suivantes. Vos réponses sont anonymes et ne seront pas divulguées.")
    ,
    newText("D'où venez-vous?")
    ,
    newDropDown("whereFrom", "")
        .add("La France", "La Belgique/Le Luxembourg", "La Suisse", "une autre partie d'Europe",
             "Le Moyen-Orient et L’Afrique du Nord", "L’Afrique occidentale/centrale", "une autre partie d’Afrique", "Le Québec/Le Nouveau-Brunswick", "une autre partie d'Amérique du Nord",
             "Les Caraïbes/L'Amérique du Sud", "une autre partie du monde")
    ,
    newText("Quel âge avez-vous?")
    ,
    newDropDown("whatAge", "")
        .add("moins de 18", "18-25", "26-35", "36-50", "50+")
    ,
    newText("Identité de genre?")
    ,
    newDropDown("whatGender", "")
        .add("homme", "femme", "non binaire", "autre")
    ,
    newText("Est-ce que vous parlez d'autres langues (y compris l'anglais)?")
    ,
    newDropDown("speakAnother", "")
        .add("oui", "non")
    ,
    newText("Si oui, laquelle/lesquelles")
    ,
    newTextInput("whatLanguage", "")
    ,
    newText("error.msg", "Veuillez répondre à toutes les questions avant de continuer.")
        .css("color", "red")
        .center()
    ,
    newButton("Prochain")
        .center()
        .print()
        .wait(
            getDropDown("whereFrom").test.selected()
            .and(getDropDown("whatAge").test.selected())
            .and(getDropDown("whatGender").test.selected())
            .and(getDropDown("speakAnother").test.selected())
            .failure(
                getText("error.msg").print("center at 50%", "bottom at 90%")
            )
        )
    ,
    newVar("v_whereFrom").global().set( getDropDown("whereFrom") )
    ,
    newVar("v_whatAge").global().set( getDropDown("whatAge") )
    ,
    newVar("v_whatGender").global().set( getDropDown("whatGender") )
    ,
    newVar("v_speakAnother").global().set( getDropDown("speakAnother") )
    ,
    newVar("v_whatLanguage").global().set( getTextInput("whatLanguage") )
)

// Main trials
Template( GetTable("containsErrorAllGroups.csv").setGroupColumn("group"),
    currentrow => {

        var startTime = 0;

        return newTrial( currentrow.label,

            newHtml("keyreminders", `
                <html><head><style>
                  table { width: 100%; border-collapse: collapse; }
                  th, td { text-align: center; }
                </style></head>
                <body>
                  <table>
                    <tr><th>Appuyez [espace] si vous entendez une erreur grammaticale</th></tr>
                  </table>
                </body></html>`)
                .css("font-family", "Helvetica, sans-serif")
                .css("font-size", "20px")
                .print("center at 50%", "middle at 50%")
            ,

            newTimer("wait", 1000)
                .start()
                .wait()
            ,

            newVar("spacePressed").global().set("no")
            ,
            newVar("RT").global().set(-1)
            ,
            newVar("audioStart").global().set( v => { startTime = Date.now(); return startTime; } )
            ,

            newAudio("cur.trial", currentrow.FILE)
                .play("once")
            ,

            newKey("cur.response", " ")
                .log("first")
                .callback(
                    getVar("spacePressed").set("yes"),
                    getVar("RT").set( v => (Date.now() - startTime) / 1000 ),
                    getAudio("cur.trial").stop()
                )
            ,

            getAudio("cur.trial")
                .wait("first")
            ,

            getHtml("keyreminders")
                .remove()
            ,

            newText("post.msg", "Appuyez sur [Entrée] pour passer au prochain enregistrement.")
                .css("font-family", "Helvetica, sans-serif")
                .css("font-size", "16px")
                .center()
                .print("center at 50%", "middle at 50%")
            ,

            newKey("proceed", "Enter")
                .wait()

        )
        .log("group",        currentrow.group)
        .log("FILE",         currentrow.FILE)
        .log("condition",    currentrow.condition)
        .log("speaker",      currentrow.speaker)
        .log("RT",           getVar("RT"))
        .log("spacePressed", getVar("spacePressed"))
    }
)

SendResults("send")

newTrial("end",
    exitFullscreen(),
    newText("<p>Le sondage est terminé. Nous vous remercions de votre participation, vous pouvez fermer cet onglet.</p>")
        .center()
        .print()
    ,
    newButton("Next")
        .css("font-family", "Helvetica, sans-serif")
        .css("font-size", "16px")
        .center()
        .print("center at 50%", "bottom at 80%")
        .wait()
        .remove()
).setOption("countsForProgressBar", false)

code = undefined
