import { init } from "@/hooks/init";
import { ready } from "@/hooks/ready";
import "vite/modulepreload-polyfill";

Hooks.once("init", init);
Hooks.once("ready", ready);
