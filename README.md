# Jhonny-RH

Pré-requisitos
- Python 2.7
- MongoDB

#### Como iniciar:

Instale o virtualenv
```
$ [sudo] pip install virtualenv
```

Crie um novo ambiente
```
$ virtualenv jhonny-rh
```
Ative-o
```
$ source jhonny-rh/bin/activate
```

Crie um novo Banco no mongo
```
$ mongo rh
```
\*`ctrl+d` para sair

#### Clone o projeto e instale as dependências:
```
$ git clone https://github.com/icorradi/jhonny-rh

$ cd jhonny-rh && pip install -r requirements.txt && bower install
```

#### Rode o servidor:
```
$ python backend/run.py
```

#### Rode a aplicação no Browser
```
$ cd app && python -m SimpleHTTPServer 8001
```

Aproveite! =]    [http://localhost:8001](http://localhost:8001)
