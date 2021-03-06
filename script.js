///// CODING CHALLENGE

/*
---- lets build a fun quiz game in the console! ---
1. Build a function constructor called Question to describe a question. A question should include: 
a) question itself
b) the answers from which the player can choose the correct one (choose an adequate data structure here, array, object etc.)
c) correct answer (I would use a number for this)

2. Create a couple of questions using the constructor

3. Store them all inside an array

4. Select one random question and log it in the console, together with the possible answers (each question should have a number) (Hint: write a method for the Questions objects for this task).

5. Use the 'prompt' function to ask the user for the correct answer. The user should input the number of the correct answer such as you displayed it on Task 4.

6. Check if the answer is correct and print to the console whether the answer is correct or not (Hint: write another method for this).

7. Suppose this code would be a plugin for other programmers to use in their code. So make sure that all your code is private and doesn't interfere with the other programmers code (Hint: we learned a special technique to do exactly that).


--- Expert level ---

8. After you display the result, display the next random question, so that the game never ends (Hint: write a function for this and call it right after displaying the result)

9. Be careful: after Task 8, the game literally never ends. So include the option to quit the game if the user writes 'exit' instead of the ansewr. In this case, DON'T call the funtion from task 8. 

10. Track the user's score to make the game more fun! so each time an answer is correct, add 1 point to the score (Hint: I'm going to use the power of closures for this, but you don't have to, just do this with the tools you feel more comfortable at this point).

11. Display the score in the console. Use yet another method for this.
*/

/*
// --- NON EXPERT SOLUTION
(function() {

    function Question(question, choices, answer) {
        this.question = question;
        this.choices = choices;
        this.answer = answer;
    }

    Question.prototype.displayQuestion = function() {
        console.log(this.question);
        for (i = 0; i < this.choices.length; i++) {
            console.log(i +': ' + this.choices[i]);
        }
    }

    Question.prototype.checkAnswer = function(ans) {
        if (ans == this.answer) {
            console.log('CORRECT!');
        } else {
            console.log('WRONG!');
        }
    }

    var q1 = new Question("Who wrote 'The Messiah'?",
                        ['Beethoven', 'Handel','Shostakovich'], 
                        1);

    var q2 = new Question("Who wrote 'Symphonie Fantastique'?",
                        ['Berlioz', 'Copland', 'Barber'],
                        0);

    var q3 = new Question("'Claire De Lune' is an example of which style of composition?",
                        ['20th Century', 'Romanticism', 'Impressionism', 'Neo-Classicism'],
                        2);

    var q4 = new Question("Chopin is most known for his compositions for which instrument?",
                        ['trumpet', 'guitar', 'Crumhorn', 'Piano'],
                        3);


    var questions = [q1, q2, q3, q4];

    var random = Math.floor(Math.random() * questions.length);

    questions[random].displayQuestion();

    var userAnswer = parseInt(prompt("What is the correct answer?"));

    questions[random].checkAnswer(userAnswer);

})();
*/




// EXPERT SOLUTION 

(function() {

    function Question(question, choices, answer) {
        this.question = question;
        this.choices = choices;
        this.answer = answer;
    }

    Question.prototype.displayQuestion = function() {
        console.log(this.question);
        for (i = 0; i < this.choices.length; i++) {
            console.log(i +': ' + this.choices[i]);
        }
    }

    Question.prototype.checkAnswer = function(ans, callback) {
        var sc; 

        if (ans == this.answer) {
            console.log('CORRECT!');
            sc = callback(true);
        } else {
            console.log('WRONG!');
            sc = callback(false);
        }

        this.displayScore(sc);
    }

    Question.prototype.displayScore = function(score) {
        console.log('Your score is: ' + score);
        console.log('-------------------------')
    }

    var q1 = new Question("Who wrote 'The Messiah'?",
                        ['Beethoven', 'Handel','Shostakovich'], 
                        '1');
    var q2 = new Question("Who wrote 'Symphonie Fantastique'?",
                        ['Berlioz', 'Copland', 'Barber'],
                        '0');
    var q3 = new Question("'Claire De Lune' is an example of which style of composition?",
                        ['20th Century', 'Romanticism', 'Impressionism', 'Neo-Classicism'],
                        '2');
    var q4 = new Question("Chopin is most known for his compositions for which instrument?",
                        ['trumpet', 'guitar', 'Crumhorn', 'Piano'],
                        '3');

    function increaseScore() {
        var score = 0;
        return function(correct) {
            if (correct) {
                score++;
            }
            return score; 
        }
    }

    var keepScore = increaseScore();

    var questions = [q1, q2, q3, q4];
    
    function nextQuestion() {
        var random = Math.floor(Math.random() * questions.length);
        questions[random].displayQuestion();
        var userAnswer = prompt("What is the correct answer?");
        if (userAnswer !== 'exit') {
            questions[random].checkAnswer(userAnswer, keepScore);
            nextQuestion();
        } else {
            console.log('thank you for playing')
        }
    }

    nextQuestion();

})();