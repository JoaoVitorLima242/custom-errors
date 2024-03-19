echo $'\n\n[requesting: nomal request]'
curl -i localhost:3000 -X POST --data '{"name": "Vingador", "age": "80"}'

echo $'\n\n[requesting: wrong age]'
curl -i localhost:3000 -X POST --data '{"name": "Vingador", "age": "18"}'

echo $'\n\n[requesting: wrong name]'
curl -i localhost:3000 -X POST --data '{"name": "vin", "age": "80"}'

echo $'\n\n[requesting: all errors]'
curl -i localhost:3000 -X POST --data '{"name": "vin", "age": "15"}'

echo $'\n\n[requesting: connectionError]'
curl -i localhost:3000 -X POST --data '{"connectionError": "error"}'
