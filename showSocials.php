<?php

$db = new SQLite3('passwords.db');

$query = "SELECT social, email, username, password FROM accounts";

$result = $db->query($query);
if (!$result) { die("Erreur lors de l'exécution de la requête : " . $db->lastErrorMsg()); }

while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
    // Affichage de chaque ligne
    print_r($row['social'] . " : " . $row['email'] . " : " . $row['username'] . " : " . $row['password'] . "<br />");
}

// Fermeture de la connexion à la base de données
$db->close();

// $results = $database->query('SELECT * FROM accounts');
// echo "<table border='1'>
//         <tr>
//             <th>id</th>
//             <th>username</th>
//             <th>password</th>
//             <th>social</th>
//         </tr>";

// while ($row = $results->fetchArray()) {
//     echo "<tr>";
//     echo "<td>" . $row['id'] . "</td>";
//     echo "<td>" . $row['username'] . "</td>";
//     echo "<td>" . $row['password'] . "</td>";
//     echo "<td>" . $row['social'] . "</td>";
//     echo "</tr>";
// }


// echo "</table>";


?>