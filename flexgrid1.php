<html>

<head>
    <title>Online Quiz</title>
    <style>
        div {
            border: 3px solid green;
            padding:10px;
        }

        

        .flex-container {
            background-color: orange;
            display: flex;
            padding: 10px;
            flex-direction: row;
        }

        .item {
            width: 170px;
            background-color: pink;
            margin: 10px;
            padding: 10px;
            font-size: 50px;
        }

        h1 {
            text-align: center;
            color: black;
            font-family: cg omega;
            font-size: 45px;
        }

        p {
            font-size: 30px;
            text-align: center;
            color: black;
        }

        .item1 {
            grid-area: header;
        }

        .item2 {
            grid-area: navigation;
        }

        .grid-container {
            display: grid;
            grid-template-areas:
                'header header header'
                'navigation navigation navigation'
                'navigation navigation navigation'
                'navigation navigation navigation';
            gap: 10px;
            background: url(quizback.jpeg);
            padding: 10px;
        }

        .item1 {
            background: url(quizback.jpeg);
            
        }

        .item2 {
            background-color: pink;
            text-align: center;
            padding: 30px;
            font-size: 100px;
        }


        
    </style>
</head>

<body>
    <div class="grid-container">
        <div class="item1">
            <h1>ONLINE QUIZ APPLICATION</h1>
            <p><i>Select the subjects given below</i></p>
            <p><i>And perform quiz and check your result</i></p>
        </div>
         <div class="item2">
            <div class="flex-container">
                <div class="item"><a href="Quiz.html">JAVA</a></div>
                <div class="item"><a href="Quiz.html">DBMS</a></div>
                <div class="item"><a href="Quiz.html">OS</a></div>
                <div class="item"><a href="Quiz.html">SE</a></div>
                <div class="item"><a href="Quiz.html">COA</a></div>
                <div class="item"><a href="Quiz.html">CI</a></div>
                
            </div>
            <br>
         <div class="flex-container">
                <div class="item"><a href="Quiz.html">JAVA</a></div>
                <div class="item"><a href="Quiz.html">DBMS</a></div>
                <div class="item"><a href="Quiz.html">OS</a></div>
                <div class="item"><a href="Quiz.html">SE</a></div>
                <div class="item"><a href="Quiz.html">COA</a></div>
                <div class="item"><a href="Quiz.html">CI</a></div>
         </div>
        </div>
    </div>
</body>

</html>