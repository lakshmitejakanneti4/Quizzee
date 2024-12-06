<?php
session_start();

include ("db.php");

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $firstname = $_POST['fname'];
    $lastname = $_POST['lname'];
    $Gender = $_POST['gender'];
    $num = $_POST['number'];
    $address = $_POST['add'];
    $gmail = $_POST['mail'];
    $password = $_POST['pass'];

    if (!empty($gmail) && !empty($password) && !is_numeric($gmail)) {
        $query = "insert into form (fname, lname, gender, cnum, address, email, pass) values ('$firstname','$lastname','$Gender','$num','$address','$gmail','$password')";

        mysqli_query($con, $query);

        echo "<script type='text/javascript'>alert('Successfully Register')</script>";

    } else {
        echo "<script type='text/javascript'>alert('Please enter some Valid Information')</script>";
    }
    if (!empty($gmail) && !empty($password) && !is_numeric($gmail)) {
        $query = "select * from form where email = '$gmail' limit 1";
        $result = mysqli_query($con, $query);

        if ($result) {
            if ($result && mysqli_num_rows($result) > 0) {
                $user_data = mysqli_fetch_assoc($result);

                if ($user_data['pass'] == $password) {
                    //header("location: index.php");
                    header("location: main.php");
                    die;
                }
            }
        }
        echo "<script type='text/javascript'> alert('wrong username or password') </script>";
    } else {
        echo "<script type='text/javascript'> alert('wrong username or password') </script>";
    }
}
?>

<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title> Form login and register</title>
    <link rel="stylesheet" href="abc.css">

</head>

<body>
    <div class="signup">
        <h1> Sign up</h1>
        <h4>It's free </h4>
        <form method="POST">
            <label>First Name</label>
            <input type="text" name="fname" required>
            <label> Last name</label>
            <input type="text" name="lname" required>
            <label> Gender</label>
            <input type="text" name="gender" required>
            <label> contact address</label>
            <input type="tele" name="number" required>
            <label>Address</label>
            <input type="text" name="add" required>
            <label> email</label>
            <input type="email" name="mail" required>
            <label>Password</label>
            <input type="password" name="pass" required>
            <input type="submit" name="" value="Submit">
        </form>
        <!-- <p>By clicking the signup botton,you agree to our<br>
            <a href="">Terms and conditions</a> and <a href="#">policy privacy</a>
        </p>-->
        <p>Already have an account?<a href="login.php"><input type="submit" name="" value="Login Here"></a></p>
    </div>
</body>

</html>