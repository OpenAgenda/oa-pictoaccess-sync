# Overview

https://drive.google.com/file/d/1VcxgAmLPOZ2isUGN6DlcMfbZeIaeY7rW/view

https://openagenda.com/agendas/{agendaUid}/locations.json?offset=xx&limit=xx

Style Guide (Airbnb): https://github.com/airbnb/javascript

# Requirements

Bonjour Thibaud,

J'ai eu Grégoire de PictoAccess après toi hier, il m'a confirmé qu'ils pouvaient simplement mettre à disposition un csv des lieux MEL réferencés dans sa base.

Je peux te proposer d'implémenter un script qui s'appuyera sur ce csv pour placer les liens PictoAccess sur les fiches lieux des agendas MEL lorsqu'une correspondance sera identifiée. Il sera déployé sur un serveur OA où il sera lancé à une fréquence à déterminer.

Le script bouclera sur les lieux des agendas MEL qui ne seront pas encore associés à PA et tentera d'identifier sur le csv un lieu correspondant. La correspondance peut se faire sur 2 critères:

 * Le nom du lieu: si le nom a une variance faible par rapport au lieu comparé ( il peut toujours y a voir une apostrophe en plus, un espace, une majuscule etc.. )
 * La distance géographique: si le lieu est à moins de 20m du lieu comparé

A mon avis nous aurons peu de cas d'erreurs en croisant ces 2 critères. Les éventuelles erreurs pourront être corrigées directement sur les fiches lieux sur OA ( le script n'écrasant pas les associations établies ).

Lorsqu'une correspondance sera identifiée, nous éditerons la fiche lieu OA sur deux points:

 * Nous ajouterons aux champ 'liens externes' de la fiche un lien vers la fiche PA ( construit sur la base de l'identifiant PA + la règle que Grégoire me communiquera )
 * Nous placerons l'identifiant PA dans le champ "identifiant externe"

Nous avons également discuté de la possibilité de mettre en place une synchronisation similaire sur d'autres réseaux. Nous n'en avons pas identifié à ce jour, mais si tu es d'accord sur le principe, nous pourrions placer le code sur un dépot avec une licence ouverte pour simplifier d'autres éventuels déploiements, par nous ou d'autres prestataires web.

Je t'envoies un devis dans la foulée, dis-moi si ce fonctionnement te conviendrais!

Je laisse Grégoire rebondir en cas d'oubli de ma part.

Bonne journée!

Kaoré
