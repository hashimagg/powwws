<template>
  <nav class="grid grid-cols-2 md:grid-cols-4 gap-y-12 uppercase relative">
    <div class="space-y-12">
      <div>
        <HeadingSans>
          リサーチ
        </HeadingSans>
        <ul role="list" class="mt-6 space-y-3">
          <li>
            <NavigationLink
              color="hover:text-red-500"
              id="pest"
              to="/pest"
              class="pointer-events-auto"
            >
              PEST
            </NavigationLink>
          </li>
        </ul>
      </div>
    </div>
    <div class="space-y-12">
      <div>
        <HeadingSans>
          —
        </HeadingSans>
        <ul role="list" class="mt-6 space-y-3">
          <li>
            <NavigationLink
              color="hover:text-green-500"
              id="bios"
              to="/bios"
              class="pointer-events-auto"
            >
              BIOS
            </NavigationLink>
          </li>
        </ul>
      </div>
    </div>
    <div class="space-y-12">
      <div>
        <HeadingSans>
          —
        </HeadingSans>
        <ul role="list" class="mt-6 space-y-3">
          <li>
            <NavigationLink
              color="hover:text-purple-500"
              id="necro"
              to="/necro"
              class="pointer-events-auto"
            >
              NECRO
            </NavigationLink>
          </li>
        </ul>
      </div>
    </div>
    <div class="space-y-12">
      <div>
        <HeadingSans>
          会社
        </HeadingSans>
        <ul role="list" class="mt-6 space-y-3">
          <li>
            <NavigationLink
              color="hover:text-teal-500"
              id="about"
              to="/about"
              class="pointer-events-auto"
            >
              POWWWS
            </NavigationLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
