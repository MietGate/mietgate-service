export function welcomeEmail(
  name:string
){

  return {

    subject:
      "Willkommen bei MietGate",

    html:

`
<div style="font-family:Arial,sans-serif">

<h1>
Willkommen bei MietGate ${name}
</h1>

<p>
Wir unterstützen dich bei deiner Wohnungssuche.
</p>

<p>
Dein MietGate Team
</p>

</div>
`

  };

}




export function premiumActivatedEmail(
  name:string
){

  return {

    subject:
      "MietGate Premium ist aktiviert",

    html:

`
<div style="font-family:Arial,sans-serif">

<h1>
Premium aktiviert
</h1>

<p>
Hallo ${name},
</p>

<p>
Dein MietGate Premium Zugang ist jetzt aktiv.
</p>

</div>
`

  };

}



