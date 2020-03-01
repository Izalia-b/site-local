<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="../css/main.css?1" />
    <title>Document</title>
</head>

<body>
<form method="POST" action="index.php">
    <input name="nameChoise" type="text">
    <button id='' type="submit">Поиск</button>
</form> 
<?php
    include('../Database.php');
    $pdo = new Database;
    $pdo->connect();
    
    $GLOBALS['nameChoise'] = $_POST['nameChoise'];
    
    echo($nameChoise);
    ?>
<table id="table-admin"class="table-admin">
        <thead>
            <tr class="">
                <th class="table-admin-th">id</th>
                <th class="table-admin-th">name</th>
                <th class="table-admin-th">phone</th>
                <th class="table-admin-th">data</th>
                <th class="table-admin-th">myId</th>
                <th class="table-admin-th">file_link</th>
            </tr>
        </thead>
        <tbody>

 <?php
 if($nameChoise){
    foreach ($pdo->showRecordsChoice($nameChoise) as $row) { ?>
        <tr>
        <td ><?php echo $row['id'] ?></td>
        <td ><?php echo $row['name'] ?></td>
        <td ><?php echo $row['phone'] ?></td>
        <td ><?php echo $row['data'] ?></td>
        <td ><?php echo $row['myId'] ?></td>
        <td ><?php echo $row['file_link'] ?></td>
        </tr>
        <?php }}else{
     foreach ($pdo->showRecords() as $row) { ?>
                <tr>
                <td ><?php echo $row['id'] ?></td>
                <td ><?php echo $row['name'] ?></td>
                <td ><?php echo $row['phone'] ?></td>
                <td ><?php echo $row['data'] ?></td>
                <td ><?php echo $row['myId'] ?></td>
                <td ><?php echo $row['file_link'] ?></td>
                </tr>

    <?php }} ?>
 </tbody>
    </table>
</body>

</html>