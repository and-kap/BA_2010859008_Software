param ([String]$app="Angular")

if ($app -eq "Angular") {
    $url = "http://localhost:4200/employees"
}
elseif ($app -eq "React") {
    $url = "http://localhost:3000/employees"
}

for ($i=0; $i -lt 100; $i++){ 
    lighthouse $url --output json --output-path report.json --quiet --preset=desktop
    $json = Get-Content 'report.json' | ConvertFrom-Json
    $tti = $json.audits.interactive
    $tti_time = [math]::round($tti.numericValue, 0)
    $tti_unit = $tti.numericUnit
    ("{0},{1},{2}" -f $app, $tti_time, $tti_unit) | Out-File -FilePath tti_angular.csv -Append
    Write-Host ("{0}: {1},{2},{3}" -f $i, $app, $tti_time, $tti_unit)
}

del *.html
del *.json