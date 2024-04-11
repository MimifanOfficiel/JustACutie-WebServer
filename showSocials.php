<?php

$database = new SQLite3('passwords.db');

$results = $database->query('SELECT * FROM accounts');

echo "<table border='1'>
<tr>
<th>id</th>
<th>username</th>
<th>password</th>
<th>social</th>
</tr>";

while ($row = $results->fetchArray()) {
    echo "<tr>";
    echo "<td>" . $row['id'] . "</td>";
    echo "<td>" . $row['username'] . "</td>";
    echo "<td>" . $row['password'] . "</td>";
    echo "<td>" . $row['social'] . "</td>";
    echo "</tr>";
}


echo "</table>";


?>