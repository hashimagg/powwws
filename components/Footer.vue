<template>
  <footer aria-labelledby="footer-heading" class="flex flex-col flex-1">
    <h2 id="footer-heading" class="sr-only">
      Footer
    </h2>
    <div class="flex md:items-center justify-between mt-6 pt-6 md:mt-12 md:pt-12 border-t border-gray-700">
      <div class="flex items-center space-x-2">
        <span class="inline text-xs text-gray-400 uppercase">
          POWWWS — 端島
        </span>
        <NavigationLink
          color="hover:text-teal-500"
          id="terminal"
          to="/terminal"
          class="pointer-events-auto"
        >
          Terminal
        </NavigationLink>
      </div>
      <div class="flex items-center justify-start sm:justify-end space-x-2">
        <FooterLink
          color="hover:text-red-500"
          id="footer-facebook"
          label="Facebook"
          url="https://hashima.gg"
          class="pointer-events-auto"
        >
          <svg class="w-4 h-4 fill-current" viewBox="0 0 512 512">
            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"/>
          </svg>
        </FooterLink>
      </div>
    </div>
  </footer>
</template>
