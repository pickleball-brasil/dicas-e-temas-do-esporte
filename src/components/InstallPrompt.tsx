"use client";
import { useState, useEffect } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  // Garantir que só renderize no cliente após hidratação
  useEffect(() => {
    setMounted(true);
    
    // Detectar iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOSDevice = /iphone|ipad|ipod/.test(userAgent);
    const isStandalone = (window.navigator as any).standalone === true;
    setIsIOS(isIOSDevice);
    
    if (isIOSDevice && isStandalone) {
      setIsInstalled(true);
    }
  }, []);

  useEffect(() => {
    // Verificar se está no cliente e já foi montado
    if (!mounted || typeof window === 'undefined') return;

    // Verificar se já está instalado
    if (window.matchMedia('(display-mode: standalone)').matches || 
        (window.navigator as any).standalone === true) {
      setIsInstalled(true);
      return;
    }

    // Verificar se o usuário dispensou recentemente
    const dismissed = localStorage.getItem('pwa-install-dismissed');
    if (dismissed) {
      const dismissedTime = parseInt(dismissed);
      const daysSinceDismissed = (Date.now() - dismissedTime) / (1000 * 60 * 60 * 24);
      if (daysSinceDismissed < 7) {
        // Não mostrar se dispensou há menos de 7 dias
        return;
      } else {
        // Se passou 7 dias, limpar o localStorage para permitir mostrar novamente
        localStorage.removeItem('pwa-install-dismissed');
      }
    }

    // Escutar o evento beforeinstallprompt (Chrome, Edge, etc)
    const handleBeforeInstallPrompt = (e: Event) => {
      console.log('beforeinstallprompt event recebido!');
      e.preventDefault();
      const promptEvent = e as BeforeInstallPromptEvent;
      setDeferredPrompt(promptEvent);
      
      // Verificar novamente antes de mostrar (caso tenha mudado)
      const recentlyDismissed = localStorage.getItem('pwa-install-dismissed');
      if (recentlyDismissed) {
        const dismissedTime = parseInt(recentlyDismissed);
        const daysSinceDismissed = (Date.now() - dismissedTime) / (1000 * 60 * 60 * 24);
        if (daysSinceDismissed < 7) {
          console.log('Prompt dispensado recentemente, não mostrando');
          return;
        }
      }
      
      console.log('Mostrando prompt de instalação');
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    
    // Verificar se o service worker está registrado
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration().then((registration) => {
        if (registration) {
          console.log('Service Worker encontrado:', registration.scope);
        } else {
          console.warn('Service Worker não encontrado. O PWA pode não funcionar corretamente.');
        }
      });
    }

    // Para iOS, mostrar instruções após um delay (já que não há beforeinstallprompt)
    if (isIOS && !isInstalled) {
      const timer = setTimeout(() => {
        const dismissed = localStorage.getItem('pwa-install-dismissed');
        if (!dismissed) {
          setShowPrompt(true);
        } else {
          const dismissedTime = parseInt(dismissed);
          const daysSinceDismissed = (Date.now() - dismissedTime) / (1000 * 60 * 60 * 24);
          if (daysSinceDismissed >= 7) {
            setShowPrompt(true);
          }
        }
      }, 3000); // Mostrar após 3 segundos no iOS

      return () => {
        clearTimeout(timer);
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      };
    }

    // Verificar se foi instalado após o prompt
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setShowPrompt(false);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, [mounted, isIOS, isInstalled]);

  const handleInstallClick = async () => {
    if (isIOS) {
      // Para iOS, apenas fechar o prompt (instruções já foram mostradas)
      handleDismiss();
      return;
    }

    if (!deferredPrompt) return;

    try {
      // Mostrar o prompt de instalação
      await deferredPrompt.prompt();

      // Aguardar a escolha do usuário
      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === 'accepted') {
        setIsInstalled(true);
        setShowPrompt(false);
        setDeferredPrompt(null);
      } else {
        // Se rejeitou, não mostrar novamente por 7 dias
        handleDismiss();
      }
    } catch (error) {
      console.error('Erro ao mostrar prompt de instalação:', error);
      handleDismiss();
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    // Não mostrar novamente por 7 dias
    localStorage.setItem('pwa-install-dismissed', Date.now().toString());
  };

  // Não renderizar nada até que o componente esteja montado no cliente
  if (!mounted) {
    return null;
  }

  // Não mostrar se já está instalado
  if (isInstalled) {
    return null;
  }

  // Para Android/Chrome: só mostrar se há deferredPrompt
  // Para iOS: mostrar instruções mesmo sem deferredPrompt
  if (!showPrompt) {
    return null;
  }

  if (!isIOS && !deferredPrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm animate-in slide-in-from-bottom-5 duration-300 lg:bottom-6 lg:right-6">
      <div className="bg-white rounded-xl shadow-2xl border border-gray-200 p-4 space-y-3">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-gray-900 mb-1">
              Instalar App
            </h3>
            {isIOS ? (
              <>
                <p className="text-xs text-gray-600 mb-3">
                  Toque no botão <strong>Compartilhar</strong> e depois em <strong>"Adicionar à Tela de Início"</strong> para instalar.
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleDismiss}
                    className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors duration-200"
                  >
                    Entendi
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="text-xs text-gray-600 mb-3">
                  Instale o Pickleball Estudos para acesso rápido e uso offline.
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleInstallClick}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    Instalar
                  </button>
                  <button
                    onClick={handleDismiss}
                    className="px-3 py-2 text-gray-500 hover:text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors duration-200"
                  >
                    Agora não
                  </button>
                </div>
              </>
            )}
          </div>
          <button
            onClick={handleDismiss}
            className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

