var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// .wrangler/tmp/bundle-InMWQi/strip-cf-connecting-ip-header.js
function stripCfConnectingIPHeader(input, init) {
  const request = new Request(input, init);
  request.headers.delete("CF-Connecting-IP");
  return request;
}
__name(stripCfConnectingIPHeader, "stripCfConnectingIPHeader");
globalThis.fetch = new Proxy(globalThis.fetch, {
  apply(target, thisArg, argArray) {
    return Reflect.apply(target, thisArg, [
      stripCfConnectingIPHeader.apply(null, argArray)
    ]);
  }
});

// index.js
var rateStore = /* @__PURE__ */ new Map();
var RATE_WINDOW_MS = 6e4;
var RATE_MAX = 15;
function isRateLimited(ip) {
  const now = Date.now();
  const rec = rateStore.get(ip);
  if (!rec || now - rec.start > RATE_WINDOW_MS) {
    rateStore.set(ip, { start: now, count: 1 });
    return false;
  }
  if (rec.count >= RATE_MAX)
    return true;
  rec.count++;
  return false;
}
__name(isRateLimited, "isRateLimited");
var SYSTEM_PROMPT = `You are Rani, the AI concierge for Sree India Palace \u2014 an authentic Hyderabadi Indian restaurant in Taichung, Taiwan.

PERSONALITY:
- English: Witty, warm, slightly theatrical. Dry humour. Food puns welcome. Never sycophantic ("Great question!" is banned).
- Chinese (\u7E41\u9AD4): Use \u672C\u5BAE (imperial self-reference) \u2014 confident, charming, subtly promotional. Market the restaurant with elegance and a hint of drama.
- Never break character. Never say you are an AI or that you are powered by Gemini/Google.
- Keep responses SHORT: 2\u20134 sentences max unless listing menu items.
- Always reply in the SAME LANGUAGE the user writes in.
- If someone writes in both EN and ZH, reply in Chinese.

RESTAURANT DETAILS:
Name: Sree India Palace (\u65AF\u91CC\u5370\u5EA6\u9910\u5EF3)
Address: No. 45, Gongyi N St, West District, Taichung 403 | \u53F0\u4E2D\u5E02\u897F\u5340\u516C\u76CA\u5317\u885745\u865F
Cuisine: Authentic Hyderabadi Indian \u2014 North & South Indian, Tandoor, Biryani
Established: 2012

HOURS:
Mon\u2013Thu: Lunch 11:30\u201315:00 | Dinner 17:00\u201322:00
Fri\u2013Sat: Lunch 11:00\u201315:30 | Dinner 17:00\u201322:30
Sunday:  Lunch 11:00\u201315:30 | Dinner 17:00\u201322:00

RESERVATIONS: Strongly recommended on weekends and for groups of 5+.
Book via Google Maps or call us. Walk-ins welcome on weekdays.

DELIVERY & PICKUP: Available on Uber Eats.

MENU HIGHLIGHTS (not exhaustive):
Soups \u2014 Tomato Soup, Mulligatawny Soup
BBQ/Tandoor \u2014 Chicken Tikka, Seekh Kebab, Paneer Tikka, Tandoori Chicken
Appetizers \u2014 Samosa, Onion Bhaji, Aloo Tikki
Breads \u2014 Garlic Naan, Butter Naan, Paratha, Puri, Roti
Veg Mains \u2014 Paneer Butter Masala, Dal Makhani, Chana Masala, Palak Paneer, Aloo Gobi
Chicken \u2014 Butter Chicken, Chicken Tikka Masala, Chicken Korma, Chicken Rogan Josh
Lamb \u2014 Lamb Rogan Josh, Lamb Korma, Lamb Vindaloo, Lamb Biryani
Seafood \u2014 Prawn Masala, Fish Curry, Prawn Biryani
Biryani \u2014 Hyderabad Dum Biryani (ADVANCE ORDER required), Chicken Biryani, Veg Biryani
South Indian \u2014 Masala Dosa, Paper Dosa, Idli Sambar, Uttapam, Vada
Desserts \u2014 Gulab Jamun, Kulfi, Kheer, Halwa
Drinks \u2014 Mango Lassi, Sweet/Salt Lassi, Masala Chai, Fresh Lime Soda

DIETARY: Full vegetarian + vegan section. Spice levels adjustable on request.
SPECIAL NOTE: Hyderabad Dum Biryani requires advance notice \u2014 mention it when booking.

AMENITIES: Free Wi-Fi \xB7 Wheelchair accessible (entrance, seating, toilet, car park)
Assistive hearing loop \xB7 High chairs \xB7 Dogs allowed inside \xB7 Paid parking lot

PAYMENTS: Credit cards & debit cards accepted. Cash also welcome.

ATMOSPHERE: Casual, cosy, quiet, trendy. Family friendly, LGBTQ+ friendly, solo-dining friendly.

RULES:
1. For prices, say they vary and suggest visiting or checking the online menu.
2. If asked something unrelated to the restaurant, redirect humorously \u2014 never answer off-topic.
3. Do not invent details not listed above.
4. For reservations, always send users to Google Maps booking or the phone number.
5. If asked about competitors, be gracefully non-committal and pivot back to our food.`;
function corsHeaders(origin) {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400"
  };
}
__name(corsHeaders, "corsHeaders");
function jsonResponse(data, status = 200, origin) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders(origin), "Content-Type": "application/json" }
  });
}
__name(jsonResponse, "jsonResponse");
var worker_default = {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders(origin) });
    }
    if (request.method !== "POST") {
      return jsonResponse({ error: "Method not allowed" }, 405, origin);
    }
    const ip = request.headers.get("CF-Connecting-IP") || request.headers.get("X-Forwarded-For") || "unknown";
    if (isRateLimited(ip)) {
      return jsonResponse(
        { error: "Too many requests \u2014 even a royal kitchen needs a breather. Try again in a minute." },
        429,
        origin
      );
    }
    let body;
    try {
      body = await request.json();
    } catch {
      return jsonResponse({ error: "Invalid JSON in request body." }, 400, origin);
    }
    const { message, history = [] } = body;
    if (!message || typeof message !== "string") {
      return jsonResponse({ error: "message field is required." }, 400, origin);
    }
    const trimmed = message.trim();
    if (trimmed.length === 0) {
      return jsonResponse({ error: "Message cannot be empty." }, 400, origin);
    }
    if (trimmed.length > 600) {
      return jsonResponse({ error: "Message too long \u2014 keep it under 600 characters." }, 400, origin);
    }
    const recentHistory = Array.isArray(history) ? history.filter((h) => h && h.content && typeof h.content === "string").slice(-6).map((h) => ({
      role: h.type === "user" ? "user" : "model",
      parts: [{ text: h.content.slice(0, 400) }]
      // cap individual history entries
    })) : [];
    const contents = [
      ...recentHistory,
      { role: "user", parts: [{ text: trimmed }] }
    ];
    try {
      const geminiRes = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${env.GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
            contents,
            generationConfig: {
              maxOutputTokens: 280,
              temperature: 0.82,
              topP: 0.92
            },
            safetySettings: [
              { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
              { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
              { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
              { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" }
            ]
          })
        }
      );
      if (!geminiRes.ok) {
        const errBody = await geminiRes.text();
        console.error(`Gemini ${geminiRes.status}:`, errBody);
        return jsonResponse(
          { error: "The kitchen is a little overwhelmed right now. Try again in a moment!" },
          502,
          origin
        );
      }
      const data = await geminiRes.json();
      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "I seem to have misplaced my train of thought. Please try asking again!";
      if (data?.candidates?.[0]?.finishReason === "SAFETY") {
        return jsonResponse(
          { error: "That topic is a little outside our menu. Let's keep it to food and reservations!" },
          200,
          origin
        );
      }
      return jsonResponse({ reply }, 200, origin);
    } catch (err) {
      console.error("Worker fetch error:", err);
      return jsonResponse(
        { error: "Something went wrong on our end. Give it another try!" },
        500,
        origin
      );
    }
  }
};

// node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-InMWQi/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = worker_default;

// node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-InMWQi/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof __Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
__name(__Facade_ScheduledController__, "__Facade_ScheduledController__");
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = (request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    };
    #dispatcher = (type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    };
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=index.js.map
