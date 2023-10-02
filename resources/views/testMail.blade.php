<!DOCTYPE html>
<html>
<head>
    <title>AllPHPTricks.com</title>
</head>
<body>
    <h1>{{ $testMailData['title'] }}</h1>
    <h5>{{ $testMailData['header'] }}</h5>
    <ol>
      <li>{{ $testMailData['l1']}}</li>
      <li>{{ $testMailData['l2']}}</li>
    </ol>
    <h3>{{ $testMailData['contact']}}</h3>
    <p>{{$testMailData['question']}}</p>
    <p>{{$testMailData['regards']}}</p>
    <p>{{$testMailData['team']}}</p>
</body>
</html>