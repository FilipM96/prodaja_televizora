<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Prodaja Televizora</title>
    <link rel="stylesheet" href="../CSS/stil.css"> 
    

</head>
<?php


 $server = "ucka.veleri.hr";
 $port = 3306;
 $database = "fmaksimovic";
 $username = "fmaksimovic";
 $password = "11";

 $conn = mysqli_connect($server,$username,$password,$database);
 $query = "SELECT * FROM televizori";
 $res = mysqli_query($conn,$query );
      
?>
<body>
    <div class="w3-container">
        <nav class="navigacija">
            <div class="w3-bar w3-blue">
                <a href="" class="w3-bar-item w3-button">Početna stranica</a>
                <a href="../HTML/kontakt.html" class="w3-bar-item w3-button">Kontakt</a>
            </div>          
        </nav>
    </div>
    <div class="w3-container">
    <h1>Prodaja televizora</h1>    
    <h2>Dobrodošli u web-shop</h2>
    <div>Popis svih televizora:
        <table class="w3-table-all">
            <tr class="w3-red">
                <th>id</th>
                <th>naziv</th>
                <th>rezolucija</th>
                <th>velicina</th>
                <th>proizvodjac</th>
                <th>slika</th>
            </tr>
            <?php
                while($row = mysqli_fetch_array($res)){
                    echo "<tr>";
                    echo "<td>".$row['id']."</td>";
                    echo "<td>".$row['naziv']."</td>";
                    echo "<td>".$row['rezolucija']."</td>";
                    echo "<td>".$row['velicina']."</td>";
                    echo "<td>".$row['proizvodjac']."</td>";
                    echo "<td><img src='".$row['slika'].
                    "' width='100px' alt='".$row['naziv']."'></td>";
                    echo "</tr>";
                }
                mysqli_close($conn);   
                ?>
        </table>
     </div>
    
</body>
</html>