# Argon2id-JS

Argon2id implementation in a plain JavaScript.

## Usage

### 1. Import library
```html
<script src="Argon2id.min.js"></script>
```

### 2. Hash
```js
/*

  Parameters:
  1. Message (String)
  2. Salt (String) <>
  3. Iterations (Int) <2> (Min = 1)
  4. Memory Cost (Int) <32> (Min = 12)
  5. Parallelism Factor (Int) <3> (Min = 1)
  6. Length (Int) <32> (Min = 1)
  7. Secret (String) <>
  8. Associated Data (String) <>

*/

// Generate hash from the provided message
// If you don't provide salt, it will be auto generated
Argon2id.hash("message");

// Generate Encoded hash from the provided message
// Both hash and hashEncoded functions accept the same parameters
Argon2id.hashEncoded("message");
// To get hash from hashEncoded function you can use function called hashDecode
Argon2id.hashDecode("$argon2id$v=19$m=32,t=3,p=3$dGVzdHRlc3R0ZXN0dGVzdA$YJjtURjUHWPGnu+B5BTdfpebyJlWEfzfbBdkO7SLquM");

// Generate hash from the provided message and salt
Argon2id.hash("message", "salt");
// To generate random secure salt use randomSalt function
Argon2id.hashEncoded("message", Argon2id.randomSalt());

// Generate hash from the provided message, salt, iterations, memory cost, parallelism factor and hash length
Argon2id.hashEncoded("message", Argon2id.randomSalt(), 2, 32, 3, 32);
// This library also support Secret and Associated Data
Argon2id.hashEncoded("message", Argon2id.randomSalt(), 2, 32, 3, 32, "Secret", "Associated Data");

// To validate the message you can use verify function.
// This function accept hashEncoded, message, secret and associated data.
Argon2id.verify("$argon2id$v=19$m=32,t=2,p=3$dW9UeUphNWNOMzRBMGtYMw$Cxao0qDvUJFAasxuFpojONVbdi6Est3RyyRBtyHRfrI", "test");
```