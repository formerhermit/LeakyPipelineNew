
var pipeStateEnum = {
    start: "start",
    fixed: "fixed",
    leaky: "leaky"
};
//setting the states of the enum

var pipeStateArray =[[pipeStateEnum.start, pipeStateEnum.start],[pipeStateEnum.start, pipeStateEnum.start ]]
//array for states in 2d to match table

var imageArray=[['<img src="Images/School.png"/>','<img src="Images/University.png"/>'],['<img src="Images/Work.png"/>','<img src="Images/Work.png"/>']]


var row
var col

$(document).ready(function () {
    $("#accordion").accordion({
        collapsible: true,
        active: false
    });

    var winW = $(window).width() / 2+100;
    var myPos = { my: "center top", at: "center top+100", of: window };

    //When page loads show welcome message
    var welcomeDialog = $("#welcomeDialog").dialog({
        dialogClass: "no-close",
        autoOpen: true,
        position: myPos,
        width: winW,
        buttons: [
    {
        text: "Got It!",
        click: function () {
            $(this).dialog("close");

        }
    }
  ]
    });

    //make this happen when document ready - prepare dialog box for scenarios

    var winW = $(window).width() / 2 +150;
    var dialog = $("#dialog").dialog({
        dialogClass: "no-close",
        width: winW,
        autoOpen: false,
        buttons: [
    {
        text: "Got It!",
        click: function () {
            var question = questions[row][col];
            var checked = $('input[name=radChoice]:checked').val();
            //declaring what checked means i.e. the selected radio button
            var cell = $("table tr:eq(" + row + ") td:eq(" + col + ")");
            //defining what cell is - i.e. traversing through the columns and rows of the table - using the row/col variables
            if (checked == question.CORRECT) {
                document.getElementById("answerText").style.backgroundColor = "#23B8D2";
                $('#answerText').html(question.RIGHT);
                $('#feedbackText').html(question.FEEDBACKG);
                $(cell).find(".start").hide();
                $(cell).find(".fixed").show();
                pipeStateArray[row][col] = pipeStateEnum.fixed;
                 changeBackground();
                var audio = $("#Cheer")[0];
                audio.play();
               
                //if they get the question correct then set the enum state to fixed, add correct feedback to the feedbakc popup and display the pretty image. Hide the leaky one
            } else {
                document.getElementById("answerText").style.backgroundColor = "#4B3363";
                $('#answerText').html(question.WRONG);
                $('#feedbackText').html(question.FEEDBACKP);
                $(cell).find(".start").hide();
                $(cell).find(".leaky").show();
                pipeStateArray[row][col] = pipeStateEnum.leaky;
                  fallingWater();
                 var audio = $("#Splash")[0];
                audio.play();
               
                //Otherwise they get the poor feedback and the leaky piece. Set enum to leaky in the pipe state array
            }
            $(this).dialog("close");
            $("#feedbackDialog").dialog("open");

            //open the feedback dialog which now has the relevant feedback text in there
        }
    }
  ]
    });

    //Feedback Box
    var winW = $(window).width() / 2 +100;
    var feedbackDialog = $("#feedbackDialog").dialog({
        dialogClass: "no-close",
        width: winW,
        autoOpen: false,
        buttons: [
    {
        text: "Got It!",
        click: function () {
            $(this).dialog("close");
                $(".drip").stop();
                 $(".droplet").stop();
                 $(".drip").hide();
                 $(".droplet").hide();
                    $('#container').show();
                    $('#myTopnav').show();
                    $('#headerwrapper').show();
                     $('#DripZone').css("background-image", "none");

            if (countInArray(pipeStateEnum.start, pipeStateArray) == 0) {
                //If count from countinArray function is 0 (all senum states are no longer start) then show results instead as game is done!

                switch (countInArray(pipeStateEnum.fixed, pipeStateArray)) {
                    //Switch statement taking the number of correct answers and displaying the relevant score and badge using hidden/show class     
                    case 0:
                        score = 0;
                        $("#resultsDialog .zero").show();
                        $('#resultsText').html(results[score]);
                        $('#resultsTitle').html(title[score]);
                        $('#action').html(actions[score]);
                        break;
                    case 1:
                        score = 1;
                        $("#resultsDialog .one").show();
                        $('#resultsText').html(results[score]);
                        $('#resultsTitle').html(title[score]);
                        $('#action').html(actions[score]);
                        break;
                    case 2:
                        score = 2;
                        $("#resultsDialog .two").show();
                        $('#resultsText').html(results[score]);
                        $('#resultsTitle').html(title[score]);
                        $('#action').html(actions[score]);
                        break;
                    case 3:
                        score = 3;
                        $("#resultsDialog .three").show();
                        $('#resultsText').html(results[score]);
                        $('#resultsTitle').html(title[score]);
                        $('#action').html(actions[score]);
                        break;
                    case 4:
                        score = 4;
                        $("#resultsDialog .four").show();
                        $('#resultsText').html(results[score]);
                        $('#resultsTitle').html(title[score]);
                        $('#action').html(actions[score]);
                }


                $("#resultsDialog").dialog("open");
                    var audio = $("#Clap")[0];
                audio.play();
            }

        }
    }
  ]
    });
    // function to iterate through array looking for specific item - in this case "start" from pipeStateArray.Returns count 
    // will be used for working out if the game is finished (if any pieces remain in start state then there are stil questions to be answered

    function countInArray(item, array) {
        var count = 0;
        for (arrayRow = 0; arrayRow < array.length; arrayRow++) {
            for (arrayCol = 0; arrayCol < array[arrayRow].length; arrayCol++) {
                if (array[arrayRow][arrayCol] == item) {
                    count++;
                }

            }
        }
        return count;
    }

    //another popup, this time for results.
    var winW = $(window).width() / 2 +100;

    var resultsDialog = $("#resultsDialog").dialog({
        dialogClass: "no-close",
        autoOpen: false,
        width: winW,
        buttons: [
    {
        text: "Got It!",
        click: function () {
            $(this).dialog("close");

        }
    }
  ]
    });

    $("td").click(function () {
        //listen for clicking a TD in the table. Need to do this so we know which question to display. 
        var $this = $(this);
        col = $this.index();
        row = $this.closest('tr').index();
        var currentPipeState = pipeStateArray[row][col];
        if (currentPipeState == pipeStateEnum.start) {
            var question = questions[row][col];
            //get position
            var image = imageArray[row][col];
            $('#dialogQuestion').html(question.QUESTION);
            $('#dialogImage').html(src =image);
            $('#dialogL1').html(question.CHOICE1);
            $('#dialogL2').html(question.CHOICE2);
            $('#dialogL3').html(question.CHOICE3);
            $("#dialog").dialog("open");
        }
    });
})

// Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */

function NavFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

  var questions = [[{ 'QUESTION':'Only 33% of girls (compared to 80% of boys) who take maths and science GCSEs will progress into STEM at A-level or equivalent. Many professional STEM occupations require qualification at Level 4 or above, and only 7% of the girls (compared to 21% of boys) who take STEM GCSEs will go on to qualify at Level 4 in a Core STEM area <a href="https://www.wisecampaign.org.uk/resources/2016/11/from-classroom-to-boardroom-the-stem-pipeline" target="_blank"> (WISE 2016a)</a>.What can your organisation do to help?', 
                       'CHOICE1': 'At school age, it’s too early for organisations to get involved. This stage requires government intervention to change the way children are taught about STEM. There are already government schemes to address this issue.', 
                       'CHOICE2': 'Male and female students just have different interests. It’s a biological fact that most girls just don’t enjoy science subjects and are focused more on the areas in which they are skilled, like arts or caring roles. It’s not something that an organisation can help with.', 
                       'CHOICE3': 'Enrol your organisation in an outreach programme with a secondary school. Ensure your outreach ambassador selection contains an equal number of female and male role models to show children what the work in STEM involves and what career routes are available.', 
                       'CORRECT': 3, 
                       'WRONG': 'Nice try, but not quite', 
                       'RIGHT': 'Well done!', 
                       'FEEDBACKG': 'Providing this information about career choices as part of outreach programmes, and giving access to role models may help to encourage girls to pursue GCSE subjects further. Outreach programmes can also be successful in helping children rekindle their interest in STEM. </br></br>71% of participants in one technology outreach programme for secondary schools, were more interested in studying science compared to 44% who had not taken part. In addition, 60% of these pupils were more interested in studying mathematics, technology and engineering <a href="http://www.stemnet.org.uk/wp-content/uploads/NFER-Summary-Evaluation-of-STEMNETs-Operations-and-Impact-December-2015.pdf" target="_blank">(NFER 2015)</a>. Does your organisation have an outreach scheme?', 
                       'FEEDBACKP': 'Organisations can definitely get involved as early as school age. One survey revealed that 43% of girls said they were put off STEM careers because they did not know enough about the kind of careers available and 60% said they also were put off by a lack of female role models <a href="https://www.wisecampaign.org.uk/resources/2016/11/from-classroom-to-boardroom-the-stem-pipeline" target="_blank">(WISE 2016)</a>. Providing this information outreach programmes may help to encourage girls to pursue STEM after GCSE. </br></br>Outreach programmes can also be successful in helping children rekindle their interest in STEM. 71% of participants in one technology outreach programme for secondary schools, were more interested in studying science compared to 44% who had not taken part. In addition, 60% of these pupils were more interested in studying mathematics, technology and engineering <a href="http://www.stemnet.org.uk/wp-content/uploads/NFER-Summary-Evaluation-of-STEMNETs-Operations-and-Impact-December-2015.pdf" target="_blank">(NFER 2015)</a>. Does your organisation have an outreach scheme?'},

                  { 'QUESTION': 'Female and male STEM students express similar intent to work in the industry, but 66.2% of the men but only 47.4% of the women graduates in 2011 went on to work in STEM. It seems that women studying a STEM subject may choose not to go into the industry, or may leave the industry in future (Peters & McWhinnie <a href=" http://www.katalytik.co.uk/wp-content/uploads/2015/11/Summary_Report_Final.pdf" target="_blank">2012</a> <a href="http://www.wes.org.uk/sites/default/files/u82/Diversity in Engineering Data Summary FINAL.pdf" target="_blank">2014</a>).As an organisation, how could you help to address this issue?', 
                    'CHOICE1': 'As an organisation, sponsor a university initiative targeted at female students. Having the company name associated with these initiatives will make the company look good.', 
                    'CHOICE2': 'Set up a partnership between your organisation and a university to create a mentoring scheme for female students.', 
                    'CHOICE3': 'This isn’t something that an organisation can get involved with. The issue lies with the colleges and universities to ensure they equip female students with the skills and knowledge they need to survive in the STEM industry', 
                    'CORRECT': 2, 
                     'WRONG': 'Nice try, but not quite', 
                     'RIGHT': 'Correct Answer!', 
                    'FEEDBACKG': 'Research has shown that having an industry mentor to whom they can relate can help females understand barriers to be faced and support measures needed in order to pursue a STEM career, and how to go about this <a href="http://www.hestem.ac.uk/sites/default/files/science_council_role_models_report.pdf" target="_blank">(Morton 2011)</a>. </br></br>A women-only mentoring programme can help to support and motivate women considering entering the STEM professions <a href="https://www.wisecampaign.org.uk/uploads/wise/files/archive/mentoring_gpg_2009.pdf" target="_blank">(WISE 2009)</a>.  Could your organisation partner with universities to provide mentoring?', 
                    'FEEDBACKP': 'This is actually an area in which an organisation can have a hands-on role in making a difference for female students of STEM subjects. Research has shown that having an industry mentor to whom they can relate can help females understand barriers to be faced and support measures needed in order to pursue a STEM career, and how to go about this <a href="http://www.hestem.ac.uk/sites/default/files/science_council_role_models_report.pdf" target="_blank">(Morton 2011)</a>. </br></br> A women-only mentoring programme can help to support and motivate women considering entering the STEM professions <a href="https://www.wisecampaign.org.uk/uploads/wise/files/archive/mentoring_gpg_2009.pdf" target="_blank">(WISE 2009)</a>.  Could your organisation partner with universities to provide mentoring?'}],

                  [{ 'QUESTION': 'Men often face social stigma for being a caregiver, making it harder for them to work part-time to care for their children, and making it hard for women to be the main career individual in the relationship <a href="http://www.publications.parliament.uk/pa/cm201314/cmselect/cmsctech/701/701.pdf" target="_blank">(UK Government 2014)</a>.How could your organisation help?', 
                     'CHOICE1': 'Give better benefit packages to men than to women. This encourages males to stay at home and females to be the career individual', 
                     'CHOICE2': 'Social stigma isn’t something which a company can get involved in changing. It’s a much wider societal issue.', 
                     'CHOICE3': 'Start a campaign in your organisation to share the stories of role models. These should be women who work and have children, and men who work part time and have successful careers', 
                     'CORRECT': 3, 
                      'WRONG': 'Actually, there is a better way', 
                       'RIGHT': 'Great, that’s right!', 
                     'FEEDBACKG': 'By ensuring role models for duality are accessible and visible - women who work and have children, and men who work part time and have successful careers, we can encourage men and women to choose a career option which suits them, rather than one which is the norm. <a href="http://www.publications.parliament.uk/pa/cm201314/cmselect/cmsctech/701/701.pdf" target="_blank">(UK Government 2014)</a>.</br></br> Does your organisation have visible role models of both genders to promote duality?', 
                     'FEEDBACKP': 'An organisation can absolutely contribute to this stage of the pipeline. Flexible working is only half of the battle, and whilst useful should be equal for both genders as well as accompanied by other measures. </br></br>By ensuring role models for duality are accessible and visible - women who work and have children, and men who work part time and have successful careers, your organisation can encourage men and women to choose a career option which suits them, rather than is simply the norm. <a href="http://www.publications.parliament.uk/pa/cm201314/cmselect/cmsctech/701/701.pdf" target="_blank">(UK Government 2014)</a>. Does your organisation have visible role models of both genders to promote duality?'},

                  { 'QUESTION': 'Gender Bias issues are prevalent in the career field for STEM industries <a href="http://www.ncbi.nlm.nih.gov/pubmed/24616490" target="_blank">(Reuben et al. 2014)</a> leading to a reduction in recruitment of women, or unequal treatment in the workplace. Women may be unintentionally treated differently in your organisation. What can you do to solve this issue?', 
                     'CHOICE1': 'Introduce gender bias training or unconscious bias training and make this mandatory for all staff.', 
                     'CHOICE2': 'Allocate a specific number of roles within your organisation for female employees only. This addresses any imbalance caused by unconscious bias', 
                     "CHOICE3": 'Ensure that all women are trained in how to handle the emotional impact of gender bias they may experience and have a reporting system in case they encounter this in their career', 
                     'CORRECT': 1, 
                      'WRONG': 'Nice try, but not quite',  
                       'RIGHT': 'Well Done!', 
                     'FEEDBACKG': 'By introducing a mandatory gender bias or unconscious bias training scheme, your organisation can help equip your employees with the skills they need to recognise and overcome this issue! <a href="http://www.publications.parliament.uk/pa/cm201314/cmselect/cmsctech/701/701.pdf" target="_blank">(UK Government 2014)</a></br></br> Could your organisation introduce unconscious bias training?', 
                     'FEEDBACKP': 'Diversity is not just a women’s issue. In order to combat unconscious bias, both men and women must work together. </br></br>Gender bias can affect potential employees as well as current employees, meaning that female applicants can also be treated differently, and possibly overlooked at application, interview stage and even for promotion opportunities. By making gender bias training/unconscious bias training mandatory <a href="http://www.publications.parliament.uk/pa/cm201314/cmselect/cmsctech/701/701.pdf" target="_blank">(UK Government 2014)</a> organisations can equip their employees with the skills they need to recognise their own unintentional assumptions. Could your organisation introduce unconscious bias training?'}]]
             
              //this is an array of the questions, and the choices x3, which choice is correct, and what the feedback text will be good vs poor. 

var title = ["Plumbing Student", 
             "Apprentice Plumber", 
             "Wrench Wrangler", 
             "Pipe Warrior", 
             "Plumbing Overlord"]

             //titles for the results box

var results = ["You have scored 0 out of 4. Thank you for taking the time to learn more about the leaky pipeline and the issues which affect women in their STEM career journey! If this is all new information to you, please don’t feel bad – you’re certainly not alone, hence the reason for this game being created.",
                "You scored 1 out of 4. Thank you for taking the time to learn more about the leaky pipeline and the issues which affect women in their STEM career journey! If this is all new information to you, please don’t feel bad – you’re certainly not alone, hence the reason for this game being created.", 
                "Well done! You scored 2 out of 4, that’s not bad. Thank you for taking the time to learn more about the leaky pipeline and the issues which affect women in their STEM career journey, and I hope that you have learned something new from this experience.", 
                "Nice one! You have scored 3 out of 4. That's pretty impressive. Clearly you're already aware of some of the issues which women face in their career journey through a STEM industry, and I hope that you learned something new from this experience.", 
                "Wow, just wow! You absolutely smashed it, scoring 4 out of 4. Very impressive! I hope that you still learned something new from this experience. Thank you for taking the time to participate"]
            //array for results text

var actions = ['The STEM skills shortage is costing the British economy £63 billion a year <a href="http://www.wearethecity.com/girls-perform-better-boys-choose-subject/" target="_blank"> (WeAreTheCity 2016)</a>, is your organisation missing out on talent?',
                'Complying with government legislation to ‘look good’ is not enough to tackle the gender gap <a href="https://www.reedsmith.com/Gender-Balancing-Its-Good-Business-01-17-2013/" target="_blank"> (Winmark & Reed Smith 2013)</a>. Can your organisation help?', 
                'Companies with more women in their executive committee have better financial performance <a href="http://www.mckinsey.com/~/media/mckinsey%20offices/france/pdfs/women_matter_2010.ashx" target="_blank"> (McKinsey 2010). Take action!', 
                'Strategies used to combat gender discrimination also support the retention of staff <a href="https://www.wgea.gov.au/sites/default/files/business_case_for_gender_equality.pdf" target="_blank"> (Australian Government 2013)</a>. Reduce costs associated with your employee turnover by taking action', 
                'Companies with two or more women on their corporate board were 56% ahead in terms of gross earnings <a href="https://www.scribd.com/document/156839187/Women-as-a-Valuable-Asset-Eng" target="_blank"> (Borisova & Sterkhova 2012)</a>. Take action now!']
            //array for calls to action displayed in results box

function fallingWater() {
        var $WaterDroplets = $(),
            StartRain = function () {
                var qt = 40;
                   var DripW = $(window).width();
                    var DripH = $(window).height();
                    $('#DripZone').css("background-image", "url(Images/LosingBG.png)");
                    $('#DripZone').css("height", DripH);
                    //changebackground to leaky background
                for (var i = 0; i < qt; ++i) {
                    var $droplet = $('<div class="droplet"></div>');
                    var randomImageSize = Math.ceil(Math.random()*60)+10;
                    //variable to make images random sizes
                    $droplet.css({
                        'left': (Math.random() * $(window).width()) + 'px',
                        'top': (- Math.random() * $(window).height()) + 'px',
                        'width': randomImageSize + 'px',
                        'height': randomImageSize + 'px'
                        //use droplet CSS and random variable to make droplets
                    });
                    // add this droplet to the set of droplets
                    $WaterDroplets = $WaterDroplets.add($droplet);
                }
                $('#DripZone').prepend($WaterDroplets);
            },
            
            GoDrops = function() {
                $WaterDroplets.each(function() {
                    
                    var RainStorm = function($drip) {
                        $drip.animate({
                            top: "500px",
                            opacity : "0",
                        }, Math.random()*-4000 + 5000, function(){
                            // this particular drop has finished, restart again
                            $drip.css({
                                'left': (Math.random() * $(window).width()) + 'px',
                                'top': (- Math.random() * $(window).height()) + 'px',
                                'opacity': 1
                            });
                            RainStorm($drip);
                        });
                    };
                    RainStorm($(this));
                });
        };
        
        StartRain();
        GoDrops();
    }
    fallingWater();
    
  

function changeBackground(){
    var DripW = $(window).width();
    var DripH = $(window).height();
    $('#DripZone').css("background-image", "url(Images/WinningBG.png)");
    $('#DripZone').css("height", DripH);
    $('#container').hide();
    $('#myTopnav').hide();
    $('#headerwrapper').hide();
}

