<nav class="relative bg-gray-300 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div class="relative flex h-16 items-center justify-between">
            <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div class="flex shrink-0 items-center">
                    <img src="{{ asset('img/LG_logo.svg') }}" alt="Your Company" class="h-8 w-auto" />
                </div>
                <div class="hidden sm:ml-6 sm:block">
                    <div class="flex space-x-4">
                        <a href="#" aria-current="page" class="rounded-md px-3 py-2 text-sm font-medium text-gray-800">Dashboard</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- bloco de navegação mobile -->
    <el-disclosure id="mobile-menu" hidden class="block sm:hidden">
        <div class="space-y-1 px-2 pt-2 pb-3">
            <a href="#" aria-current="page" class="block rounded-md px-3 py-2 text-base font-medium text-gray-800">Dashboard</a>
        </div>
    </el-disclosure>
</nav>