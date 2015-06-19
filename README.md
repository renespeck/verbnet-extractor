# VerbNet Extractor

# Embedded Clauses

## NP V NP *that* S

Rephrased so the object NP is connected through "to", and the subordinate clause S becomes the object. For example: 

  - "I advised Greg that he should leave" -> "I advised to Greg that he should leave"
  - "I promised Jen that I will wash the dishes" -> "I promised to Jen that I will wash the dishes"

## NP V *that* S

The subordinate clause S becomes the object. For example:

  - "I admire that Greg is a champion horse"
  - "I asked that they keep the noise down"
  
When these verbs are used without "that" (not always permitted), they are treated the same. 
E.g. "I wish they would keep the noise down".
 
## NP V S\_\*

## List

I consider Greg to be a friend -> I consider that Greg is a friend
I know Greg to eat soup -> I know that Greg eats soup
I jumped the fence to escape the dog -> I jumped the fence in order to escape the dog

  - NP V S
    - I saw her bake the cake. (OC\_BARE\_INF)  
  - NP V NP S\_INF
    - I helped him to finish the homework. (OC\_TO\_INF)
    - I needed him to go. (NP\_TO\_INF)
    - I forced him to come. (OC\_TO\_INF)
  - NP V NP S\_ING
    - I helped him with finishing the homework. (OC\_ING)
    - I loved him writing novels. (POSS\_ING)
    - I needed his cooking. (POSS\_ING)
  - NP V S\_INF
    - I loved to write. (SC\_TO\_INF)
    - I need to come. (SC\_TO\_INF)
  - NP V S\_ING
    - I loved writing. (BE\_SC\_ING)
    - He considered smoking. (BE\_SC\_ING)
    - I helped with finishing the homework. (AC\_ING)
    - I saw him laughing. (OC\_ING)
    - I saw their laughing and joking. (POS\_ING)
    - I need exercising. (NP\_OMIT\_ING)
    - I need him cooking. (ACC\_ING)
  - NP V that S 
    - The children liked that the clown had a red nose. (THAT\_COMP)
    - They considered that he was the professor. (THAT\_COMP)
  - NP V NP to be NP
    - They considered him to be the professor. (TO\_BE)
  - NP V NP to be ADJ
    - I needed him to be nice. (TO\_BE)


# Ambiguous Verbs 

## Common to 'ditrans\_to' and 'ditrans\_for'

  "lease",
  "phone",
  "rent",
  "roll",
  "shoot",
  "toss",
  "vote",

## Common to 'ditrans\_be' and 'ditrans\_for'

  "call",
  "find",
  "make",
  "secure",
  "vote",

## Common to 'ditrans\_be' and 'ditrans\_to'

  "guarantee",
  "promise",
  "vote",


# VerbNet Modifications

The following modifications were made to the VerbNet XML files:

  - merged `force-59-1`'s frame into `force-59` to allow "I convinced him to come"  