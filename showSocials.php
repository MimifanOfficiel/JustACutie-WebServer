<?php

$db = new SQLite3('passwords.db');

$query = "SELECT social, email, username, password FROM accounts";

$result = $db->query($query);
if (!$result) { die("Erreur lors de l'exécution de la requête : " . $db->lastErrorMsg()); }

echo 
    "<table border='1'>
        <tr>
            <th>social</th>
            <th>email</th>
            <th>username</th>
            <th>password</th>
        </tr>";

while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
    echo "<tr>";
    echo "<td>" . $row['social'] . "</td>";
    echo "<td>" . $row['email'] . "</td>";
    echo "<td>" . $row['username'] . "</td>";
    echo "<td>" . $row['password'] . "</td>";
    echo "</tr>";
}

?>